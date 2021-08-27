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
loadSprite('wall-hztl', 'tileset/tileMapSpace04.png'),



scene('game', () => {
    const maps = [
      'xhhhhhhhhhhhhhhw',
      'v              v',
      'v              v',
      'v              v',
      'v              v',
      'v              v',
      'v              v',
      'v              v',
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

    }
    addLevel(maps, levelConfig)
}),
start('game')