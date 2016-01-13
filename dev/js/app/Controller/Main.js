App.define('Controller.Main', {

    grid: 'View.Grid',
    panel: 'View.Panel',
    canvas: 'View.Canvas',
    algorithms: 'Controller.Algorithms',

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
        this.grid.deactivateAllPixels();

        switch (this.algorithm) {

            case 'dda':
                this.algorithms.dda(point1, point2, this.gridColor);
            break;

            case 'bresenham':
                this.algorithms.bresenham(point1, point2, this.gridColor);
            break;

            default:
            case 'analytic':
                this.algorithms.analytic(point1, point2, this.gridColor);
            break;


        }
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

        var me = this, initial = true, timeout = null, lastP1 = null, lastP2 = null;

        this.panel.addListener('points-change', function(e, point1, point2){

            //Apenas para a inicialização
            if(initial) {
                me.updateLine(point1, point2);
                return;
            }

            //Guarda o ultimo par de pontos informados
            lastP1 = point1;
            lastP2 = point2;

            //Se tiver algum timeout definido, para aqui
            if(timeout !== null) return;

            // Define um tempo entre as entradas e a rasterização da linha para
            // evitar gargalo e perca de desempenho devido a possivilidade de
            //muitas entradas em curto periodo de tempo.
            timeout = setTimeout(function(){
                //Atuliza sempre com o ultimo ponto informado
                me.updateLine(lastP1, lastP2);
                timeout = null;
            }, 300);

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
        me.panel.setPoint(1, 150, 150);
        me.panel.setPoint(2, 600, 450);
        me.panel.setAlgorithm('analytic');
        initial = false;
    },

    init: function(){
        var me = this;
        me.grid = me._appRoot_.get(me.grid);
        me.algorithms = me._appRoot_.get(me.algorithms);
        me.canvas = me._appRoot_.get(me.canvas);
        me.panel = me._appRoot_.get(me.panel);
    }

});
