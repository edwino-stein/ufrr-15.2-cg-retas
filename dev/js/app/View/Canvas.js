App.define('View.Canvas', {

    grid: 'View.Grid',
    $domObj: '#canvas',
    visiable: true,

    line: null,

    updateViewbox: function(width, height){
        this.$domObj[0].setAttribute('viewBox', '0 0 '+width+' '+height);
    },

    ready: function () {
        this.updatePosition();
    },

    setX1: function(x){
        this.line.setAttribute('x1', x);
    },

    setY1: function(y){
        this.line.setAttribute('y1', y);
    },

    setX2: function(x){
        this.line.setAttribute('x2', x);
    },

    setY2: function(y){
        this.line.setAttribute('y2', y);
    },

    getViewBoxWidth: function(){
        return this.$domObj[0].viewBox.baseVal.width
    },

    getViewBoxHeight: function(){
        return this.$domObj[0].viewBox.baseVal.height
    },

    ready: function(){
        var me = this;
        me.grid.$domObj.on('grid-raster', function(e, scale, pixelsWidth, pixelsHeight, width, height){
            me.updateViewbox(width, height);
        });
    },

    init: function(){

        var me = this;
        me.$domObj = $(me.$domObj);
        me.grid = me._appRoot_.get(me.grid);
        me.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        me.$domObj[0].appendChild(this.line);

        me.line.setAttribute('x1', 0);
        me.line.setAttribute('y1', 0);
        me.line.setAttribute('x2', 0);
        me.line.setAttribute('y2', 0);
        me.line.setAttribute('stroke', '#000');
        me.line.setAttribute('stroke-width', 0.5);
    }
});
