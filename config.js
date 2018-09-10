
sqrImages3 = ['image/bevy3.png', 'image/bevy3_01.png', 'image/bevy3_02.png', 'image/bevy3_03.png', 'image/bevy3_04.png',
    'image/bevy3_05.png', 'image/bevy3_06.png', 'image/bevy3_07.png', 'image/bevy3_08.png'	
];
sqrImages4 = ['image/bevy4.png', 'image/bevy4_01.png', 'image/bevy4_02.png', 'image/bevy4_03.png', 'image/bevy4_04.png',
    'image/bevy4_05.png', 'image/bevy4_06.png', 'image/bevy4_07.png', 'image/bevy4_08.png',
    'image/bevy4_09.png', 'image/bevy4_10.png', 'image/bevy4_11.png', 'image/bevy4_12.png',
    'image/bevy4_13.png', 'image/bevy4_14.png', 'image/bevy4_15.png'   
];
sqrImages5 = ['image/bevy5.png', 'image/bevy5_01.png', 'image/bevy5_02.png', 'image/bevy5_03.png', 'image/bevy5_04.png',
    'image/bevy5_05.png', 'image/bevy5_06.png', 'image/bevy5_07.png', 'image/bevy5_08.png',
    'image/bevy5_09.png', 'image/bevy5_10.png', 'image/bevy5_11.png', 'image/bevy5_12.png',
    'image/bevy5_13.png', 'image/bevy5_14.png', 'image/bevy5_15.png', 'image/bevy5_16.png',
    'image/bevy5_17.png', 'image/bevy5_18.png', 'image/bevy5_19.png', 'image/bevy5_20.png',
    'image/bevy5_21.png', 'image/bevy5_22.png', 'image/bevy5_23.png', 'image/bevy5_24.png',    
];

var picImages = new Array();
picImages[0] = null;

for (var i=1; i<25; i++) {
    var img = document.createElement("canvas");    
    picImages[i] = img;  
}

function Config() {
}

Config.prototype.setSize = function(size) {
    if (size == 3) {
        Config.prototype.size = size;
        Config.prototype.tileCount = 9;
        Config.prototype.pixelSize = 120;
        Config.prototype.sqrImages = sqrImages3;       
    }
    else if (size == 4) {
        Config.prototype.size = size;
        Config.prototype.tileCount = 16;
        Config.prototype.pixelSize = 90;
        Config.prototype.sqrImages = sqrImages4;  
    }
    else if (size == 5) {
        Config.prototype.size = size;
        Config.prototype.tileCount = 25;
        Config.prototype.pixelSize = 72;
        Config.prototype.sqrImages = sqrImages5;         
    }
}

Config.prototype.isNumbers = true;
Config.prototype.boardSize = 360;
Config.prototype.bigCanvas = null;
Config.prototype.setSize(3);

Config.prototype.createPicImages = function(bigCanvas)
{
    Config.prototype.bigCanvas = bigCanvas;
    
    var x = 0;
    var y = 0;
    for (var i=1; i<Config.prototype.tileCount; i++) {
        var canvas = picImages[i];
        canvas.width = Config.prototype.pixelSize;
        canvas.height = Config.prototype.pixelSize;        
        var ctx = canvas.getContext('2d');
        ctx.drawImage(bigCanvas, x, y, Config.prototype.pixelSize, Config.prototype.pixelSize,
            0, 0, Config.prototype.pixelSize, Config.prototype.pixelSize);
        x += Config.prototype.pixelSize;
        if (x >= 360) {
            x = 0
            y += Config.prototype.pixelSize;
        }
    }
    Config.prototype.isNumbers = false;
    switchPics();
}