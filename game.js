kaboom({
  global: true,
  fullscreen: true,
  
  debug: true,
  clearColor: [0, 0, 0, 0.8],

})



loadSprite('wall1', 'assets/wall1.png')




loadSprite('floor', 'tileset/tileMapSpace08.png')
loadSprite('good-guy-rt', 'assets/hood_dudes33.png')
loadSprite('good-guy-lt', 'assets/hood_dudes21.png')
loadSprite('good-guy-down', 'assets/hood_dudes09.png')
loadSprite('good-guy-up', 'assets/hood_dudes45.png')
loadSprite('sm-alien', 'assets/hood_dudes03.png')
loadSprite('stairL', 'assets/stairs0.png')
loadSprite('stairR', 'assets/stairs2.png')
loadSprite('door', 'assets/floor-door00.png')
loadSprite('bad-guy', 'assets/bad-guy.png')
loadSprite('kaboom', 'tileset/kaboom.png')



scene('game', (
  { level, score }
) => {
  layers(['backgrnd', 'obj', 'ui'], 'obj')
  const maps = [
    [
      'vvvvvvvvvvvvdvvv',
      'v              v',
      'v       a      v',
      'v              v',
      'v              d',
      'v              v',
      'v        a     v',
      'v              v',
      'v    st        v',
      'vvvvvvvvvvvvvvvv'
    ],
    [ 'vvvvvvvvvvvvvvvv',
      'v              v',
      'v              v',
      'v              v',
      'v              v',
      'v           b  v',
      'd              v',
      'v              v',
      'v              v',
      'vvvvvvvvvvvvvvvv'],

  ]




  const levelConfig = {
    width: 48,
    height: 48,



    
  
    'v': [sprite('wall1'), solid(), 'wall1'],
    'f': [sprite('floor'), 'floor'],
    'r' : [sprite('good-guy-rt'), 'ggr'],
    'l': [sprite('good-guy-lt'), 'ggl'],
    'd': [sprite('good-guy-down'), 'ggd'],
    'u': [sprite('good-guy-up'), 'up'],
    'a': [sprite('sm-alien'), 'sm-alien', 'dangerous', { dir: -1 }],
    's' : [sprite('stairL'), 'next-level'],
     't' : [sprite('stairR'), 'next-level'],
    'd' : [sprite('door'), 'next-level'],
    'b' : [sprite('bad-guy'), 'bad-guy', 'dangerous', scale(1),{ dir: -1, timer: 0 }]

  }
  addLevel(maps[level], levelConfig)

  const scoreLabel = add([
    text('0'),
    pos(250, 340),
    layer('ui'),
    scale(3),
    {
      value: score,
    }
  ])

  const player = add([sprite('good-guy-rt'),
  pos(5, 190),
  {
    dir: vec2(1,0)
  }])


  player.action(() => {
    player.resolve()
  })

  player.overlaps('next-level', () => {
    go('game', {
      level: (level +1) % maps.length,
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

  function spawnFire (p) {
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

  const badguySpeed = 60
  action('bad-guy', (s) => {
    s.move(0, s.dir * badguySpeed)
    s.timer -=dt()
    if(s.timer <= 0) {
      s.dir = - s.dir
      s.timer = rand(5)
    }
  })
  collides('kaboom','bad-guy', (k,s) => {
    camShake(3)
      wait(1, () => {
        destroy(k)
      })
      destroy(s)
      scoreLabel.value++
      scoreLabel.text = scoreLabel.value

  })

  collides('dangerous', 'wall1', (s) => {
    s.dir = -s.dir
  })

  player.overlaps('dangerous', () => {
    go('lose', { score: scoreLabel.value })
  })

}),
  scene('lose', ({ score }) => {
    add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)])
  })

scene('landing', () => {
 add([text('landing')])

 
})


start('landing',
  // { level: 0, score: 0 }
)