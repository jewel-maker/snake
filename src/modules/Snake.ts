class Snake{
    // 表示蛇头的元素
    head:HTMLElement;
    // 表示蛇的身体(包括蛇头) 实时获取
    bodies:HTMLCollection;
    // 获取蛇的容器
    element:HTMLElement;
    constructor(){
        this.head=document.querySelector('#snake>div')!;
        this.element=document.getElementById('snake')!;
        this.bodies=this.element.getElementsByTagName('div')!
    }
    // 获取蛇的坐标（蛇头的坐标）
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }
    // 设置蛇头的坐标
    set X(value:number){
        // 如果新值和旧值相同 没有移动 不修改
        if(this.X===value){
            return;
        }
        // X值的合法范围0-290
        if(value<0||value>290){
            // 进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了...');
        }
        // 修改X时，是在修改水平坐标，蛇在向左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetLeft===value){
            // 如果发生掉头 让蛇向反方向继续移动
            if(value>this.X){
                if(value>this.X){
                    // 如果新值value大于旧值 则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                    value = this.X-10;
                }else{
                    // 向左走
                    value=this.X+10;
                }
            }
        }
        // 移动身体
        this.moveBody();
        this.head.style.left=value+'px';
        // 检查有没有撞到自己
        this.checkHeadBody();
    }
    set Y(value:number){
        if(this.Y===value){
            return;
        }
        // Y值的合法范围0-290
        if(value<0||value>290){
            // 进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了...');
        }

        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop===value){
            // 如果发生掉头 让蛇向反方向继续移动
            if(value>this.Y){
                if(value>this.Y){

                    value = this.Y-10;
                }else{
                    
                    value=this.Y+10;
                }
            }
        }
        // 移动身体
        this.moveBody();
        this.head.style.top=value+'px';
        // 检查有没有撞到自己
        this.checkHeadBody();
    }
    // 给蛇增加身体
    addBody(){
        // 向element中添加一个div
        this.element.insertAdjacentHTML("beforeend","<div></div>");
    }
    // 蛇身体移动
    moveBody(){
        /**
         * 将后边的身体设置为前边身体的位置
         * 例：
         * 第4节=第3节位置
         * 第3节=第2节位置
         * 第2节=第1节位置
         */
        // 遍历所有身体
        for(let i=this.bodies.length-1;i>0;i--){
            // 获取前边身体位置
            let X =(this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y =(this.bodies[i-1] as HTMLElement).offsetTop;
            // 将这个值设置到当前身体
            (this.bodies[i] as HTMLElement).style.left=X+'px';
            (this.bodies[i] as HTMLElement).style.top=Y+'px';
        }
    }
    // 检查蛇头与身体是否相撞
    checkHeadBody(){
        // 获取所有的身体坐标 检查其是否和蛇头坐标发生重叠
        for(let i=1;i<this.bodies.length;i++){
            let bd = this.bodies[i] as HTMLElement
            if(this.X===bd.offsetLeft&&this.Y===bd.offsetTop){
                // 进入判断 说明蛇头撞到身体
                throw new Error("撞到自己了!");
                
            }
        }
    }
}
export default Snake;