kaboom({
  global: true,
  fullscreen: true,
  scale: 1.2,
  debug: true,
  clearColor: [0, 0, 0, 0.8]
})


loadSprite('top-rt-cnr', 'tileset/tileMapSpace05.png')
loadSprite('top-left-cnr', 'tileset/tileMapSpace21.png')
loadSprite('bottom-right-cnr', 'tileset/tileMapSpace10.png')
loadSprite('bottom-left-cnr', 'tileset/tileMapSpace12.png')
loadSprite('wall-vert', 'tileset/tileMapSpace07.png')
loadSprite('wall-hztl', 'tileset/tileMapSpace04.png')
loadSprite('floor', 'tileset/tileMapSpace08.png')
loadSprite('good-guy-rt', 'tileset/player.4/good-guy07.png')
loadSprite('good-guy-lt', 'tileset/player.4/good-guy10.png')
loadSprite('good-guy-down', 'tileset/player.4/good-guy01.png')
loadSprite('good-guy-up', 'tileset/player.4/good-guy04.png')
loadSprite('sm-alien', 'tileset/aliens/sm-alien.png')
loadSprite('stair', 'tileset/stair.png')
loadSprite('door', 'tileset/tileMapSpace48.png')
loadSprite('bad-guy', 'tileset/bad-guy.png')
loadSprite('kaboom', 'tileset/kaboom.png')



scene('game', (
  { level, score }
) => {
  layers(['backgrnd', 'obj', 'ui'], 'obj')
  const maps = [
    [
      'xhhhhhhhhhhdhhhw',
      'v              v',
      'v             v',
      'v              v',
      'v     a        v',
      'v              v',
      '               v',
      'v              v',
      'v              v',
      'zhhhhhhhhhhhhhhy'
    ],
    ['xhhhhhhhhhhdhhhw',
    'v              v',
    'v              v',
    'v              v',
    'v              v',
    'v        b     v',
    'v              v',
    'v   s          v',
    'v              v',
    'zhhhhhhhhhhhhhhy'],

  ]




  const levelConfig = {
    width: 32,
    height: 32,



    'w': [sprite('top-rt-cnr'), solid(), 'wall'],
    'x': [sprite('top-left-cnr'), solid(), 'wall'],
    'y': [sprite('bottom-right-cnr'), solid(), 'wall'],
    'z': [sprite('bottom-left-cnr'), solid(), 'wall'],
    'v': [sprite('wall-vert'), solid(), 'wall'],
    'h': [sprite('wall-hztl'), solid(), 'wall'],
    'f': [sprite('floor'), 'floor'],
    'r': [sprite('good-guy-rt'), 'ggr'],
    'l': [sprite('good-guy-lt'), 'ggl'],
    'd': [sprite('good-guy-down'), 'ggd'],
    'u': [sprite('good-guy-up'), 'up'],
    'a': [sprite('sm-alien'), 'sm-alien', 'dangerous', scale(0.15), { dir: -1 }],
    's' : [sprite('stair'), scale(0.5), 'next-level'],
    'd' : [sprite('door'), 'next-level'],
    'b' : [sprite('bad-guy'), 'bad-guy', 'dangerous', { dir: -1, timer: 0 }]

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

  collides('dangerous', 'wall', (s) => {
    s.dir = -s.dir
  })

  player.overlaps('dangerous', () => {
    go('lose', { score: scoreLabel.value })
  })

}),
  scene('lose', ({ score }) => {
    add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)])
  })
start('game',
  { level: 0, score: 0 }
)