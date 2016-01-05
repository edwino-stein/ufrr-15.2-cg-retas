App.define('View.Canvas', {

    grid: 'View.Grid',
    $domObj: '#canvas',
    visiable: true,

    line: null,
    
    updatePosition: function(){
        var width = this.grid.$container.width(),
            height = this.grid.$container.height(),
            x = ($('#screen').outerWidth() - width)/2 - 1;

        this.$domObj.css({
            left: x,
            width: width,
            height: height
        });

        this.$domObj[0].setAttribute('viewBox', '0 0 '+width+' '+height);
    },

    ready: function () {
        this.updatePosition();
    },

    setX1: function(x){
        this.line.setAttribute('x1', x);
    }

    setY1: function(y){
        this.line.setAttribute('y1', y);
    }

    setX2: function(x){
        this.line.setAttribute('x2', x);
    }

    setY2: function(y){
        this.line.setAttribute('y2', y);
    }

    init: function(){
        this.$domObj = $(this.$domObj);
        this.grid = this._appRoot_.get(this.grid);

        this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.line.setAttribute('x1', 0);
        this.line.setAttribute('y1', 0);
        this.line.setAttribute('x2', 0);
        this.line.setAttribute('y2', 0);
        this.line.setAttribute('stroke', '#000');
        this.line.setAttribute('stroke-width', 0.5);
        this.$domObj[0].appendChild(this.line);
    }
});