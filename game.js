kaboom({
  global: true,
  fullscreen: true,

  debug: true,
  clearColor: [0, 0, 0, 0.8],

})



loadSprite('wall1', 'assets/wall1.png')




loadSprite('test1', 'assets/stairs7.png')

loadSprite('good-guy-rt', 'assets/hood_dudes33.png')
loadSprite('good-guy-lt', 'assets/hood_dudes21.png')
loadSprite('good-guy-down', 'assets/hood_dudes09.png')
loadSprite('good-guy-up', 'assets/hood_dudes45.png')
loadSprite('sm-alien', 'assets/hood_dudes03.png')
loadSprite('stairL', 'assets/stairs6.png')
loadSprite('stairR', 'assets/stairs4.png')
loadSprite('door', 'assets/floor-door00.png')
loadSprite('bad-guy', 'assets/bad-guy.png')
loadSprite('kaboom', 'assets/fire.png')
loadSprite('coverAngel', 'assets/coverAngel.png')
loadSprite('rockWay', 'assets/floor-tile02.png')
loadSprite('candle1', 'assets/candle1.png')
loadSprite('vertCoffin','assets/vertCoffin.png')
loadSprite('redBucket','assets/redBucket.png')
loadSprite('candle2', 'assets/candle2.png')
loadSprite('blueBucket', 'assets/blueBucket.png')
loadSprite('purpleCoffin', 'assets/purpleCoffin.png')
loadSprite('blueBottle', 'assets/blueBottle.png')
loadSprite('greenBottle', 'assets/greenBottle.png')
loadSprite('redOpen', 'assets/redOpen.png')
loadSprite('axe1', 'assets/axe1.png')
loadSprite('sword1', 'assets/sword1.png')



scene('game', (
  { level, score }

) => {
  layers(['backgrnd', 'obj', 'ui'], 'obj')
  const maps = [
    [ '                     ',
      '     vvvvvvvvvvvvvvddvvv',
      '     v$           ctsc v',
      '     v       a       a v',
      '   vvv                 v',
      '   vff   vvvv   @o     d',
      '   vvv   vnnv   ^      v',
      '     v   vvvv          v',
      '     v    axv   a      v',
      '     v     !v       g$pv',
      '     vvvvvvvvvvvvvvvvvvv'
    ],
    ['vvvvvvvvvvvvvvvvv',
      'v        $     v',
      'v    &    b    v',
      'v             av',
      'v              v',
      'v  $p          v',
      'd        a     v',
      'v            oov',
      'v           ooov',
      'vvvvvvvvvvvvvvvv'],

  ]




  const levelConfig = {
    width: 48,
    height: 48,
   





    'v': [sprite('wall1'), solid(), 'wall1'],
    'r': [sprite('good-guy-rt'), 'ggr'],
    'l': [sprite('good-guy-lt'), 'ggl'],
    'd': [sprite('good-guy-down'), 'ggd'],
    'u': [sprite('good-guy-up'), 'up'],
    'a': [sprite('sm-alien'), 'sm-alien', 'dangerous', { dir: -1 }],
    's': [sprite('stairL'), 'next-level'],
    't': [sprite('stairR'), 'next-level'],
    'd': [sprite('door'), 'next-level'],
    'b': [sprite('bad-guy'), 'bad-guy', 'dangerous', scale(1), { dir: -1, timer: 0 }],
    'f' : [sprite('rockWay'), 'rockWay'],
    'c' : [sprite('candle1'), solid(), 'candle1'],
    '@' : [sprite('vertCoffin', solid())],
    'o' : [sprite('redBucket', solid())],
    '!' : [sprite('candle2', solid())],
    '$' : [sprite('blueBucket', solid())],
    '&' : [sprite('purpleCoffin', solid())],
    'p' : [sprite('blueBottle', solid())],
    'g' : [sprite('greenBottle'), solid()],
    'n' : [sprite('redOpen'), solid(), 'wall1'],
    'x' : [sprite('axe1', solid())],
    '^' : [sprite('sword1')]

  }
  addLevel(maps[level], levelConfig)

  const scoreLabel = add([
    text('0'),
    pos(700, 550),
    layer('ui'),
    scale(3),
    {
      value: score,
    },
  ])
    add([text('Score:', 24), pos(550, 549)])

  const player = add([sprite('good-guy-rt'),
  pos(190, 240),
  {
    dir: vec2(1.3, 0)
  }])


  player.action(() => {
    player.resolve()
  })

  player.overlaps('next-level', () => {
    go('game', {
      level: (level + 1) % maps.length,
      score: scoreLabel.value
    })
  })

  const playerSpeed = 120
  keyDown('left', () => {
    player.changeSprite('good-guy-lt')
    player.move(-playerSpeed, 0)
    player.dir = vec2(-1, 0)
  })
  keyDown('right', () => {
    player.changeSprite('good-guy-rt')
    player.move(playerSpeed, 0)
    player.dir = vec2(1, 0)
  })
  keyDown('up', () => {
    player.changeSprite('good-guy-up')
    player.move(0, -playerSpeed)
    player.dir = vec2(0, -1)
  })
  keyDown('down', () => {
    player.changeSprite('good-guy-down')
    player.move(0, playerSpeed)
    player.dir = vec2(0, 1)
  })

  function spawnFire(p) {
    const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
    wait(1, () => {
      destroy(obj)
    })
  }
  keyPress('space', () => {
    spawnFire(player.pos.add(player.dir.scale(48)))
  })

  const alienSpeed = 120
  action('sm-alien', (s) => {
    s.move(s.dir * alienSpeed, 0)
  })
  collides('kaboom', 'sm-alien',  (k, s) => {
    camShake(4)
    wait(1, () => {
      destroy(k)
    })
    destroy(s)
    scoreLabel.value+= 5
    scoreLabel.text = scoreLabel.value })


  const badguySpeed = 60
  action('bad-guy', (s) => {
    s.move(0, s.dir * badguySpeed)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = - s.dir
      s.timer = rand(5)
    }
  })
  collides('kaboom', 'bad-guy',  (k, s) => {
    camShake(4)
    wait(1, () => {
      destroy(k)
    })
    destroy(s)
    scoreLabel.value+= 10
    scoreLabel.text = scoreLabel.value
    wait(1, () => {
      go('win')
    })

  })

  collides('dangerous', 'wall1', (s) => {
    s.dir = -s.dir
  })

  player.overlaps('dangerous', () => {
    go('lose', { score: scoreLabel.value })
  })

}),
  scene('lose', ({ score }) => {
    add([text('Score: ' + score, 28), pos(610, 260)])
    add([text('Game Over', 50), pos(495, 150)])
     add([text('Press " h " to return home', 12), pos(560, 380)])
    keyPress('h', () => {
      go('landing')
    })

  })

  scene('win', () => {
    add([text('WINNER', 50), pos(550, 200) ])
    add([text('Press " h " to return home', 12), pos(540, 380)])
      keyPress('h', () => {
      go('landing')
    })
  })


scene('landing', () => {


  add([sprite('coverAngel'), scale(2), pos(80, 70)])
  add([text('Death Stalker', 50), pos(430, 100)])
  add([text('Press " s " to start game', 20), pos(500, height() / 2)])
  add([text('Objective:', 15), pos(50, 530)])
  add([text('Find the Angel of Death and kill it!', 10), pos(53, 555)])
  add([text('Directions:', 15), pos(50, 585)])
  add([text('Use arrows to move your hero', 10), pos(53, 610)])
  add([text('Spacebar to shoot fiya', 10), pos(53, 625)])
  add([text('Play on laptop, not mobile friendly', 10), pos(53, 641)])


  keyPress('s', () => {
    go('game', { level: 0, score: 0 })
  })
})

start('landing')