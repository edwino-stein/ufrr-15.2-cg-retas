App.define('Controller.Main', {

    grid: 'View.Grid',
    panel: 'View.Panel',
    canvas: 'View.Canvas',

    algorithm: null,
    gridColor: 'black',
    canvasColor: 'gray',

    canvasToGridX: function(x){
        return Math.floor((this.grid.pixelsWidth * x)/this.canvas.getViewBoxWidth());
    },

    canvasToGridY: function(y){
        return Math.floor((this.grid.pixelsHeight * y)/this.canvas.getViewBoxHeight());
    },

    render: function(point1, point2){
        if(this.algorithm === null) return;
        console.log('render');
    },

    updateLine: function(point1, point2){
        this.canvas.setPoint1(point1);
        this.canvas.setPoint2(point2);
        this.canvas.setColor(this.canvasColor);

        this.render(point1, point2);
    },

    setColor: function(color){

        switch(color){
            case 'blue':
                this.gridColor = 'blue';
                this.canvasColor = 'yellow';
            break;

            case 'red':
                this.gridColor = 'red';
                this.canvasColor = 'cyan';
            break;

            case 'green':
                this.gridColor = 'green';
                this.canvasColor = 'magenta';
            break;

            case 'yellow':
                this.gridColor = 'yellow';
                this.canvasColor = 'blue';
            break;

            case 'black':
            default:
                this.gridColor = 'black';
                this.canvasColor = 'gray';
            break;
        }

    },

    ready: function(){

        var me = this;

        this.panel.addListener('points-change', function(e, point1, point2){
            me.updateLine(point1, point2);
        });

        this.panel.addListener('resolution-change', function(e, resolution){
            me.grid.raster(resolution);
            me.updateLine(
                me.canvas.getPoint1(),
                me.canvas.getPoint2()
            );
        });

        this.panel.addListener('color-change', function(e, color){
            me.setColor(color);
            me.updateLine(
                me.canvas.getPoint1(),
                me.canvas.getPoint2()
            );
        });

        this.panel.addListener('algorithm-change', function(e, algorithm){
            me.algorithm = algorithm;
            me.updateLine(
                me.canvas.getPoint1(),
                me.canvas.getPoint2()
            );
        });

        me.panel.setResolution(10);
        me.panel.setPoint(1, 200, 200);
        me.panel.setPoint(2, 600, 400);
        me.panel.setAlgorithm('analytic');
    },

    init: function(){
        var me = this;
        me.grid = me._appRoot_.get(me.grid);
        me.canvas = me._appRoot_.get(me.canvas);
        me.panel = me._appRoot_.get(me.panel);
    }

});
