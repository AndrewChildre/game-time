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



scene('game', () => {
    const maps = [
      'xhhhhhhhhhhhhhhw',
      'v              v',
      'v      a        v',
      'v              v',
      'v       r      v',
      'v              v',
      'v              v',
      'v              v',
      'v              v',
      'zhhhhhhhhhhhhhhy'
    ]

      // 'xhhhhhhhhhhhhhhw',
      // 'vffffffffffffffv',
      // 'vffffffffffffffv',
      // 'vffffffffffffffv',
      // 'vffffffffffffffv',
      // 'vffffffffffffffv',
      // 'vffffffffffffffv',
      // 'vffffffffffffffv',
      // 'vffffffffffffffv',
      // 'zhhhhhhhhhhhhhhy']
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
      'r' : [sprite('good-guy-up'), 'up'],
      'a' : [sprite('sm-alien'), 'sm-all', scale(0.15)]

    }
    addLevel(maps, levelConfig)
}),
start('game')