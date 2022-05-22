//定义食物Food
class Food{
    // 定义一个属性表示食物对应的元素
    element:HTMLElement;
    constructor(){
        // 获取页面中food元素 并将其赋值给element
        this.element=document.getElementById('food')!;
    }
    // 获取一个获取食物x轴坐标的方法
    get X(){
        return this.element.offsetLeft;
    }
    // 获取一个获取食物Y轴坐标的方法
    get Y(){
        return this.element.offsetTop;
    }
    // 修改食物位置
    change(){
        // 生成一个随机的位置 左0~290 上0~290 只能是10的倍数 因为🐍每移动一次为10
        let left = Math.round(Math.random()*29)*10;
        let top = Math.round(Math.random()*29)*10;
        this.element.style.left=left+'px';
        this.element.style.top=top+'px';
    }
}
export default Food;