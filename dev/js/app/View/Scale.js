App.define('View.Scale', {

    grid: 'View.Grid',
    $domObj: '#scale',

    newPoint: function(x, y){
        return new this.util.Point(x, y);
    },

    updateViewbox: function(width, height){
        this.$domObj[0].setAttribute('viewBox', '-15 -15 '+width+' '+height);
    },

    append: function(obj){
        this.$domObj[0].appendChild(obj);
        return obj;
    },

    query: function(selector){
        return this.$domObj.find(selector);
    },

    canvasToScale: function(point, width, height){

        var viewBoxWidth = this.getViewBoxWidth() - 60,
            viewBoxHeight = this.getViewBoxHeight() - 60;

        return this.newPoint(
            ((point.x*viewBoxWidth)/width) + 15,
            viewBoxHeight - ((point.y*viewBoxHeight)/height) + 15
        );
    },



    getViewBoxWidth: function(){
        return this.$domObj[0].viewBox.baseVal.width
    },

    getViewBoxHeight: function(){
        return this.$domObj[0].viewBox.baseVal.height
    },

    rasterMM: function(width, height){

        this.append(this.createLine(
            this.newPoint(0, 15),
            this.newPoint(0, height)
        ));

        this.append(this.createLine(
            this.newPoint(15, height + 16),
            this.newPoint(width, height + 16)
        ));

        var text, point, i, middle;

        text = this.createText('0 mm', this.newPoint(0, height + 15));
        text.setAttribute('transform', 'rotate(45 0 '+(height + 15)+')');
        this.append(text);

        middle = true;
        for(i = 50; i <= width; i += 50){

            point = this.canvasToScale(
                this.newPoint(i, 0),
                width, height
            );

            if(middle){
                this.append(this.createLine(
                    this.newPoint(point.x, height + 16 - 4),
                    this.newPoint(point.x, height + 16 + 2)
                ));
            }
            else{
                this.append(this.createLine(
                    this.newPoint(point.x, height + 8),
                    this.newPoint(point.x, height + 19)
                ));
                this.append(this.createText(i, this.newPoint(point.x, height + 16 + 8)));
            }

            middle = !middle;
        }

        while(height % 100 !== 0) height--;
        middle = false;
        for(i = height; i >= 50; i -= 50){

            point = this.canvasToScale(
                this.newPoint(0, i),
                width, height
            );

            if(middle){
                this.append(this.createLine(
                    this.newPoint(-2, point.y),
                    this.newPoint(4, point.y)
                ));
            }
            else{
                this.append(this.createLine(
                    this.newPoint(-3, point.y),
                    this.newPoint(8, point.y)
                ));

                text = this.createText(i, this.newPoint(-8, point.y));
                text.setAttribute('transform', 'rotate(270 -8 '+point.y+')');
                this.append(text);
            }

            middle = !middle;
        }
    },

    gridToScale: function(point, width, height, scale){
        var viewBoxWidth = this.getViewBoxWidth() - 60,
            viewBoxHeight = this.getViewBoxHeight() - 60;

        return this.newPoint(
            ((point.x*viewBoxWidth)/width) + 15 + ((scale-1)/2),
            viewBoxHeight - ((((point.y + 1)*viewBoxHeight)/height) - 16 - ((scale-1)/2))
        );
    },

    rasterPX: function(pixelsWidth, pixelsHeight, width, height, scale){

        this.append(this.createLine(
            this.newPoint(width + 15, 15),
            this.newPoint(width + 15, height)
        ));

        this.append(this.createLine(
            this.newPoint(15, 0),
            this.newPoint(width, 0)
        ));

        var jump, point, i, text;

        text = this.createText('px', this.newPoint(width + 15, 0));
        text.setAttribute('transform', 'rotate(45 '+(width + 15)+' 0)');
        this.append(text);

        switch (scale) {
            case 10:
            default:
                jump = 12;
            break;
            case 9:
            case 8:
                jump = 11;
            break;
            case 7:
                jump = 13;
            break;
            case 6:
            case 5:
                jump = 15;
            break;
            case 4:
                jump = 20;
            break;
            case 3:
                jump = 21;
            break;
        }

        for(i = 0; i < pixelsWidth; i += jump){

            point = this.gridToScale(
                this.newPoint(i, 0),
                pixelsWidth, pixelsHeight, scale
            );

            this.append(this.createLine(
                this.newPoint(point.x, 8),
                this.newPoint(point.x, -3)
            ));
            this.append(this.createText(i, this.newPoint(point.x,  -8)));
        }


        point = this.gridToScale(
            this.newPoint(pixelsWidth -1, 0),
            pixelsWidth, pixelsHeight, scale
        );

        this.append(this.createLine(
            this.newPoint(point.x, 8),
            this.newPoint(point.x, -3)
        ));

        this.append(this.createText(pixelsWidth -1, this.newPoint(point.x,  -8)));

        for(i = 0; i < pixelsHeight; i += jump){

            point = this.gridToScale(
                this.newPoint(0, i),
                pixelsWidth, pixelsHeight, scale
            );

            this.append(this.createLine(
                this.newPoint(width + 15 - 8, point.y),
                this.newPoint(width + 15 + 2, point.y)
            ));
            text = this.createText(i, this.newPoint(width + 15 + 8, point.y));
            text.setAttribute('transform', 'rotate(90 '+(width + 15 + 8)+' '+point.y+')');
            this.append(text);
        }

        point = this.gridToScale(
            this.newPoint(0, pixelsHeight - 1),
            pixelsWidth, pixelsHeight, scale
        );

        this.append(this.createLine(
            this.newPoint(width + 15 - 8, point.y),
            this.newPoint(width + 15 + 2, point.y)
        ));
        text = this.createText(pixelsHeight -1, this.newPoint(width + 15 + 8, point.y));
        text.setAttribute('transform', 'rotate(90 '+(width + 15 + 8)+' '+point.y+')');
        this.append(text);
    },

    createLine: function(point1, point2){
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', point1.x);
        line.setAttribute('y1', point1.y);
        line.setAttribute('x2', point2.x);
        line.setAttribute('y2', point2.y);
        return line;
    },

    createText: function(text, point){
        var node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        node.setAttribute('x', point.x);
        node.setAttribute('y', point.y);
        node.setAttribute('text-anchor', 'middle');
        node.setAttribute('dominant-baseline', 'central');
        node.appendChild(document.createTextNode(text));
        return node;
    },

    clear: function(){
        this.$domObj.find('text, line').remove();
    },

    ready: function(){
        var me = this;
        me.grid.$domObj.on('grid-raster', function(e, scale, pixelsWidth, pixelsHeight, width, height){
            me.clear();
            me.updateViewbox(width + 45, height + 45);
            me.rasterMM(width, height);
            me.rasterPX(pixelsWidth, pixelsHeight, width, height, scale);
        });
    },

    init: function(){
        this.grid = this._appRoot_.get(this.grid);
        this.$domObj = $(this.$domObj);
        this.util = this._appRoot_.get('Util');
    }
});
