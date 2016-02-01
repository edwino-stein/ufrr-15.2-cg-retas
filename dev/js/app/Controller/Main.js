App.define('Controller.Main', {

    grid: 'View.Grid',
    panel: 'View.Panel',
    canvas: 'View.Canvas',
    algorithms: 'Controller.Algorithms',
    $time: '#time',

    algorithm: null,
    gridColor: {red: 0, green: 0, blue: 0},

    render: function(point1, point2){

        if(this.algorithm === null) return;
        this.grid.clearFrame(false);
        var time = 0;
        switch (this.algorithm) {
            case 'dda':
                time = this.algorithms.dda(point1, point2, this.gridColor);
            break;

            case 'bresenham':
                time = this.algorithms.bresenham(point1, point2, this.gridColor);
            break;

            default:
            case 'analytic':
                time = this.algorithms.analytic(point1, point2, this.gridColor);
            break;
        }

        this.grid.update();
        this.$time.find('span').html((time).toFixed(5));
    },

    updateLine: function(point1, point2){
        this.canvas.setPoint1(point1);
        this.canvas.setPoint2(point2);
        this.canvas.setColor(this.gridColor);

        this.render(point1, point2);
    },

    setColor: function(color){
        this.gridColor = color;
        this.canvas.setColor(color);
    },

    ready: function(){

        var me = this;

        this.panel.addListener('points-change', function(e, point1, point2){
            me.updateLine(point1, point2);
        });

        this.panel.addListener('resolution-change', function(e, resolution){
            me.grid.setResolution(resolution);
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

        me.panel.setResolution(7);
        me.panel.setPoint(1, 150, 150);
        me.panel.setPoint(2, 600, 450);
        me.panel.setAlgorithm('analytic');
    },

    init: function(){
        var me = this;
        me.grid = me._appRoot_.get(me.grid);
        me.algorithms = me._appRoot_.get(me.algorithms);
        me.canvas = me._appRoot_.get(me.canvas);
        me.panel = me._appRoot_.get(me.panel);
        me.$time = $(me.$time);
    }

});
