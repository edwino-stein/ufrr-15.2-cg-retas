App.define('Controller.Algorithms', {

    grid: 'View.Grid',
    canvas: 'View.Canvas',

    newPoint: function(x, y){
        return new this.util.Point(x, y);
    },

    getTimeStamp: function(){
      return Date.now()
      // return new Date().getUTCMilliseconds();
    },

    /**
        Converte um ponto do canvas(mm) em um pixel da grid
    */
    canvasToGrid: function(x, y){
        return this.newPoint(
            Math.floor((this.grid.pixelsWidth * x)/this.canvas.getViewBoxWidth()),
            Math.floor((this.grid.pixelsHeight * y)/this.canvas.getViewBoxHeight())
        );
    },

    /**
        Pega o tamanho de um pixel da grid
    */
    getPixelSize: function(){
        return this.grid.pixelScale;
    },

    /**
        Algoritmo Analitico de rasterização de retas
    */
    analytic: function(start, end, color){

        var pixelSize = this.getPixelSize(),
            time = this.getTimeStamp(),
            x, y;

        if(start.x === end.x){

            //Inverte os pontos caso o ponto inicial esteja abaixo do ponto final
            if(end.y < start.y){
                var tmp = end;
                end = start;
                start = tmp;
            }

            x = start.x;
            for(y = start.y; y < end.y; y += pixelSize)
                this.grid.activePixel(this.canvasToGrid(x, y), color);
        }
        else{

            //Inverte os pontos caso o ponto final esteja a direta do ponto inicial
            if(end.x < start.x){
                var tmp = end;
                end = start;
                start = tmp;
            }

            var m = (end.y - start.y)/(end.x - start.x),
                b = end.y - m * end.x;

            for(var x = start.x; x <= end.x; x += pixelSize){
                y = m * x + b;
                this.grid.activePixel(this.canvasToGrid(x, y), color);
            }
        }

        return this.getTimeStamp() - time;
    },

    /**
        Algoritmo DDA para rasterização de retas

        Baseado na implementação encontrada no site tutorialspoint acessível em
        <http://www.tutorialspoint.com/computer_graphics/line_generation_algorithm.htm>
     */
    dda: function(start, end, color){

        var time = this.getTimeStamp()
            dx = end.x - start.x,
            dy = end.y - start.y,
            steps = dx > dy ? Math.abs(dx) : Math.abs(dy),
            incrementX = dx/steps,
            incrementY = dy/steps,
            x = start.x, y = start.y;

        for(var i = 0; i <= steps; i++){
            this.grid.activePixel(this.canvasToGrid(x, y), color);
            x += incrementX;
            y += incrementY;
        }

        return this.getTimeStamp() - time;
    },

    bresenham: function(start, end, color){

        var time = this.getTimeStamp();
        
        //Converte para coordenadas inteiras aos seus pixels correspondentes da matriz
        start = this.canvasToGrid(start.x, start.y);
        end = this.canvasToGrid(end.x, end.y);

        var octante, dx, dy, p, pixel = this.newPoint(start.x, start.y);

        //Descobre em qual octante a reta pertence
        if(start.x <= end.x){
            dx = end.x - start.x;
            if(start.y <= end.y){
                dy = end.y - start.y;
                octante = (dx >= dy) ? 1 : 2;
            }
            else{
                dy = start.y - end.y;
                octante = (dx >= dy) ? 8 : 7;
            }
        }
        else{
            dx = start.x - end.x;
            if(start.y <= end.y){
                dy = end.y - start.y;
                octante = (dx >= dy) ? 4 : 3;
            }
            else{
                dy = start.y - end.y;
                octante = (dx >= dy) ? 5 : 6;
            }
        }

        switch (octante) {
            case 1:
                p = 2*dy - dx;
                for(pixel.x; pixel.x <= end.x; pixel.x++){
                    this.grid.activePixel(pixel, color);
                    if(p < 0){
                        p += 2*dy;
                        continue;
                    }
                    pixel.y++;
                    p += 2*(dy - dx);
                }
            break;
            case 2:
                p = 2*dx - dy;
                for(pixel.y; pixel.y <= end.y; pixel.y++){
                    this.grid.activePixel(pixel, color);
                    if(p < 0){
                        p += 2*dx;
                        continue;
                    }
                    pixel.x++;
                    p += 2*(dx - dy);
                }
            break;
            case 3:
                p = 2*dx - dy;
                for(pixel.y; pixel.y <= end.y; pixel.y++){
                    this.grid.activePixel(pixel, color);
                    if(p < 0){
                        p += 2*dx;
                        continue;
                    }
                    pixel.x--;
                    p += 2*(dx - dy);
                }
            break;
            case 4:
                p = 2*dy - dx;
                for(pixel.x; pixel.x >= end.x; pixel.x--){
                    this.grid.activePixel(pixel, color);
                    if(p < 0){
                        p += 2*dy;
                        continue;
                    }
                    pixel.y++;
                    p += 2*(dy - dx);
                }
            break;
            case 5:
                p = 2*dy - dx;
                for(pixel.x; pixel.x >= end.x; pixel.x--){
                    this.grid.activePixel(pixel, color);
                    if(p < 0){
                        p += 2*dy;
                        continue;
                    }
                    pixel.y--;
                    p += 2*(dy - dx);
                }
            break;
            case 6:
                p = 2*dx - dy;
                for(pixel.y; pixel.y >= end.y; pixel.y--){
                    this.grid.activePixel(pixel, color);
                    if(p < 0){
                        p += 2*dx;
                        continue;
                    }
                    pixel.x--;
                    p += 2*(dx - dy);
                }
            break;
            case 7:
                p = 2*dx - dy;
                for(pixel.y; pixel.y >= end.y; pixel.y--){
                    this.grid.activePixel(pixel, color);
                    if(p < 0){
                        p += 2*dx;
                        continue;
                    }
                    pixel.x++;
                    p += 2*(dx - dy);
                }
            break;
            case 8:
                p = 2*dy - dx;
                for(pixel.x; pixel.x <= end.x; pixel.x++){
                    this.grid.activePixel(pixel, color);
                    if(p < 0){
                        p += 2*dy;
                        continue;
                    }
                    pixel.y--;
                    p += 2*(dy - dx);
                }
            break;
        }

        return this.getTimeStamp() - time;
    },

    init: function(){
        var me = this;
        me.grid = me._appRoot_.get(me.grid);
        me.canvas = me._appRoot_.get(me.canvas);
        this.util = this._appRoot_.get('Util');
    }
});
