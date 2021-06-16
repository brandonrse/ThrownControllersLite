(function() {

    // Global Game Variables
    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;

    let assetManager:createjs.LoadQueue;
    let assetManifest: any[];

    // Store current scene information
    let currentScene:objects.Scene;
    let currentState:number;

    assetManifest = [
        {id:"xbox1", src:"./Assets/xbox1.png"},
        {id:"snes", src:"./Assets/snes.png"},
        {id:"ps3", src:"./Assets/ps3.png"},
        {id:"n64", src:"./Assets/n64.png"},
        {id:"dream", src:"./Assets/dream.png"},
        {id:"gamecube", src:"./Assets/gamecube.png"},
        {id:"atari", src:"./Assets/atari.png"},
        {id:"ps4", src:"./Assets/ps4.png"},
        {id:"xbox", src:"./Assets/xbox.png"},
        {id:"nes", src:"./Assets/nes.png"},

        {id:"score", src:"./Assets/score.png"},
        {id:"gamebg", src:"./Assets/gamebg.png"},
        {id:"gamebrutalbg", src:"./Assets/gamebrutalbg.png"},
        {id:"triangle", src:"./Assets/triangle.png"},
        {id:"check", src:"./Assets/check.png"},
        {id:"x", src:"./Assets/x.png"},
        {id:"circlegrn", src:"./Assets/circlegrn.png"},
        {id:"circlered", src:"./Assets/circlered.png"},
        {id:"winner", src:"./Assets/winner.png"},
        {id:"winbg", src:"./Assets/winbg.png"},

        {id:"easy", src:"./Assets/easy.png"},
        {id:"brutal", src:"./Assets/brutal.png"},
        {id:"tricky", src:"./Assets/tricky.png"},
        {id:"lightning", src:"./Assets/lightning.png"},
        {id:"multiple", src:"./Assets/multiple.png"},


        {id:"earthbound", src:"./Assets/audio/easy.mp3"},
        {id:"smithy", src:"./Assets/audio/brutal.mp3"},
        {id:"select", src:"./Assets/audio/misc_menu.wav"},
        {id:"menubgm", src:"./Assets/audio/menubgm.mp3"},
        {id:"yes", src:"./Assets/audio/winfretless.ogg"},
        {id:"no", src:"./Assets/audio/wrong.wav"},
        {id:"race", src:"./Assets/audio/racing.mp3"},
        {id:"winbgm", src:"./Assets/audio/win.ogg"}
    ];

    function Init() {
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }

    function Start() {

        // Initialize CreateJS
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);

        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);

        // Set up default game states -- State Machine
        objects.Game.stage = stage;
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;

        Main();
    }

    function Update() {
        // Has my state changed since the last check?
        if(currentState != objects.Game.currentScene)
        {
            Main();
        }
        currentScene.Update();
        stage.update();
    }


    function Main() {

        // Finite State Machine
        switch(objects.Game.currentScene)
        {
            case config.Scene.START:
                stage.removeAllChildren();
                currentScene = new scenes.StartScene(assetManager);
                stage.addChild(currentScene);
            break;
            case config.Scene.GAME:
                stage.removeAllChildren();
                currentScene = new scenes.PlayScene(assetManager);
                stage.addChild(currentScene);
            break;
            case config.Scene.WIN:
                stage.removeAllChildren();
                currentScene = new scenes.WinScene(assetManager);
                stage.addChild(currentScene);
            break;
        }
        currentState = objects.Game.currentScene;
    }
    window.onload = Init;
})();