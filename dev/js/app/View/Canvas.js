App.define('View.Canvas', {

    grid: 'View.Grid',
    $domObj: '#canvas',
    visiable: true,

    line: null,

    newPoint: function(x, y){
        return new this.util.Point(x, y);
    },

    updateViewbox: function(width, height){
        this.$domObj[0].setAttribute('viewBox', '0 0 '+width+' '+height);
    },

    setPoint1: function(point){
        this.line.setAttribute('x1', point.x);
        this.line.setAttribute('y1', point.y);
    },

    setPoint2: function(point){
        this.line.setAttribute('x2', point.x);
        this.line.setAttribute('y2', point.y);
    },

    getPoint1: function(){

        var x = parseInt(this.line.getAttribute('x1')),
            y = parseInt(this.line.getAttribute('y1'));

        return this.newPoint(
            !isNaN(x) ? x : 0,
            !isNaN(y) ? y : 0
        );
    },

    getPoint2: function(){

        var x = parseInt(this.line.getAttribute('x2')),
            y = parseInt(this.line.getAttribute('y2'));

        return this.newPoint(
            !isNaN(x) ? x : 0,
            !isNaN(y) ? y : 0
        );
    },

    setColor: function(c){
        var color = '';

        color += ((0xff ^ c.red) < 16 ? '0' : '') + (0xff ^ c.red).toString(16);
        color += ((0xff ^ c.green) < 16 ? '0' : '') + (0xff ^ c.green).toString(16);
        color += ((0xff ^ c.blue) < 16 ? '0' : '') + (0xff ^ c.blue).toString(16);
        this.line.setAttribute('stroke', '#'+color);
    },

    getViewBoxWidth: function(){
        return this.$domObj[0].viewBox.baseVal.width
    },

    getViewBoxHeight: function(){
        return this.$domObj[0].viewBox.baseVal.height
    },

    ready: function(){
        var me = this;
        me.updateViewbox(800, 600);
    },

    init: function(){

        var me = this;
        me.$domObj = $(me.$domObj);
        me.grid = me._appRoot_.get(me.grid);
        me.util = me._appRoot_.get('Util');
        me.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        me.$domObj[0].appendChild(this.line);

        me.line.setAttribute('x1', 0);
        me.line.setAttribute('y1', 0);
        me.line.setAttribute('x2', 0);
        me.line.setAttribute('y2', 0);
        me.line.setAttribute('stroke', '#000');
        me.line.setAttribute('stroke-width', '2');
    }
});
