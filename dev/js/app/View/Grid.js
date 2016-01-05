App.define('View.Grid', {

    $container: '#grid',
    $domObj: 'table',
    
    maxWidth: 800,
    maxHeight: 600,

    pixelsWidth: 0,
    pixelsHeight: 0,

    pixelScale: 5,
    minPixelScale: 3,
    maxPixelScale: 10,

    getPixel: function(x, y){
        var pixel = this.$container.find('td[x='+x+'][y='+y+']');
        return pixel.length > 0 ? pixel[0] : null;
    },

    activePixel: function(x, y, color){
        var pixel = this.getPixel(x, y);

        if(pixel === null) return;

        switch(color){

            case 'blue':
            case 1:
                color = 'blue';
            break;

            case 'red':
            case 2:
                color = 'red';
            break;

            case 'green':
            case 3:
                color = 'green';
            break;

            case 'yellow':
            case 4:
                color = 'yellow';
            break;

            case 'black':
            case 5:
            default:
                color = 'black';
            break;
        }

        $(pixel).removeClass('actived blue red green yellow black')
                .addClass('actived '+color);

        return pixel;
    },

    deactivatePixel: function(x, y){
        var pixel = this.getPixel(x, y);
        if(pixel === null) return;
        $(pixel).removeClass('actived blue red green yellow black');
        return pixel;
    },

    deactivateAllPixels: function(){
        this.$domObj.find('.actived').removeClass('actived blue red green yellow black');
    },

    createCol: function(x, y){
        var col = document.createElement('td');
        col.setAttribute('x', x);
        col.setAttribute('y', y);
        return col;
    },

    createRow: function(offset){
        var row = document.createElement('tr');
        row.setAttribute('offset', offset);
        return row;
    },

    addRow: function(cols){

        var y = this.countRows();
        var row = this.createRow(y);
        for(var i = 0; i < cols; i++)
            row.appendChild(this.createCol(i, y));

        this.$domObj.append(row);
    },

    clear: function(){
        this.$domObj.find('tr').remove();
    },

    raster: function(scale){
        if(scale < this.minPixelScale || scale > this.maxPixelScale)
            throw 'Escala inválida';

        this.clear();
        this.pixelScale = scale;
        this.$domObj.attr('pixel-scale', this.pixelScale);
        
        var width = this.maxWidth/scale,
            height = this.maxHeight/scale;

        for(var i = 0; i < height; i++){
            this.addRow(width);
        }

        this.pixelsWidth = width;
        this.pixelsHeight = height;
    },



    countRows: function(){
        return this.$domObj.find('tr').length;
    },

    ready: function(){
        this.$domObj.attr('pixel-scale', this.pixelScale);
    },

    init: function(){
        this.$container = $(this.$container);
        this.$domObj = $(this.$container).find(this.$domObj);
    }
});