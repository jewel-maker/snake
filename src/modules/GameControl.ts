// 引入其他类
import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';
// 游戏控制器
class GameControl{
    // 定义三个属性
    snake:Snake;
    food:Food;
    scorePanel:ScorePanel;
    // 创建一个属性来存储蛇的移动方向（也就是按键方向）
    direction:string='';
    // 记录游戏是否结束
    isLive=true;

    constructor(){
        this.snake=new Snake();
        this.food=new Food();
        this.scorePanel=new ScorePanel();
        this.init();
    }
    // 游戏的初始化方法，调用后，游戏即开始
    init(){
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown',this.keydownHandler.bind(this));
        // 调用run使🐍移动
        this.run();
    }
    // 创建一个键盘按下的响应函数
    keydownHandler(event:KeyboardEvent){
        // 检查event.key的值是否合法

        this.direction=event.key;
    }
    // 创建控制蛇移动的方法
    run(){
        /* 
        根据方向this.direction来控制蛇的位置改变
        向上 top 减少
        向下 top 增加
        向左 left 减少
        向右 right 增加
        */
       let X = this.snake.X;
       let Y = this.snake.Y;
       switch(this.direction){
            case 'ArrowUp':
            case 'Up':
                Y-=10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y+=10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X-=10;
                break;
            case 'ArrowRight':
            case 'Right':
                X+=10;
                break;          

       }     
        //检查蛇是否吃到了食物
        this.checkEat(X,Y);
        //修改蛇的X Y值  
       try {
        this.snake.X=X;
        this.snake.Y=Y;  
       } catch (e)
        {
            //进入异常 游戏介绍 弹出提示
            alert((e as any).message+'Game Over');
            this.isLive=false;
       }           
        
        //开启一个定时器
        this.isLive&&setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30);
    }
    // 定义一个方法 检查蛇是否吃到了食物
    checkEat(X:number,Y:number){
        if(X===this.food.X&&Y===this.food.Y){
            // 食物位置重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇增加一节
            this.snake.addBody();
        }
    }
    
}
export default GameControl;