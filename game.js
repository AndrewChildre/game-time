kaboom({
  global: true,
  fullscreen: true,
  scale: 1.2,
  debug: true,
  clearColor: [0,0,0,0.8]
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



scene('game', (
  // {level, score}
  ) => {
  layers(['backgrnd', 'obj', 'ui'], 'obj')
    const maps = [
      'xhhhhhhhhhh hhhw',
      'v              v',
      'v      a       v',
      'v              v',
      'v              v',
      'v              v',
      '               v',
      'v     a         v',
      'v              v',
      'zhhhhhhhhhhhhhhy'
    ]

 
    const levelConfig = {
      width: 32,
      height: 32,
    
      'w':[sprite('top-rt-cnr'), solid(), 'wall'],
      'x':[sprite('top-left-cnr'), solid(), 'wall'],
      'y' : [sprite('bottom-right-cnr'), solid(), 'wall'],
      'z' : [sprite('bottom-left-cnr'), solid(), 'wall'],
      'v' : [sprite('wall-vert'), solid(), 'wall'],
      'h' : [sprite('wall-hztl'), solid(), 'wall'],
      'f' : [sprite('floor'), 'floor'],
      'r' : [sprite('good-guy-rt'), 'ggr'],
      'l' : [sprite('good-guy-lt'), 'ggl'],
      'd' : [sprite('good-guy-down'), 'ggd'],
      'u' : [sprite('good-guy-up'), 'up'],
      'a' : [sprite('sm-alien'), 'sm-all', scale(0.15)]

    }
    addLevel(maps, levelConfig)

    const player = add([sprite('good-guy-rt'),
    pos(5, 190)
    ])
    const playerSpeed = 120
    keyDown('left', () => {
      player.changeSprite('good-guy-lt')
      player.move(-playerSpeed, 0)
    })
      keyDown('right', () => {
        player.changeSprite('good-guy-rt')
      player.move(playerSpeed, 0)
    })
      keyDown('up', () => {
        player.changeSprite('good-guy-up')
      player.move(0, -playerSpeed)
    })
     keyDown('down', () => {
       player.changeSprite('good-guy-down')
      player.move(0, playerSpeed)
    })

    
    
}),
start('game', 
// {level: 0, score: 0}
)