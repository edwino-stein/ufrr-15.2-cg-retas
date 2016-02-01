App.define('View.Panel', {

    $domObj: '#panel',
    canvas: 'View.Canvas',
    grid: 'View.Grid',

    $points: '#x1, #y1, #x2, #y2',
    $resolutionSelect: '#resolution',
    $palette: '#palette td',
    $algorithmSelect: '#algorithm',

    newPoint: function(x, y){
        return new this.util.Point(x, y);
    },

    colorHexToDec: function(hex){

        if(hex.length === 3)
            return new this.util.Color(
                parseInt(hex[0]+hex[0], 16),
                parseInt(hex[1]+hex[1], 16),
                parseInt(hex[2]+hex[2], 16)
            );

        else if(hex.length === 6)
            return new this.util.Color(
                parseInt(hex.slice(0, 2), 16),
                parseInt(hex.slice(2, 4), 16),
                parseInt(hex.slice(4, 6), 16)
            );

        else
            return new this.util.Color(0, 0, 0);

    },

    addListener: function(eventName, handle){
        this.$domObj.on(eventName, handle);
    },

    getPoint: function(index){
        var x, y;
        if(index <= 1 ){
            x = parseInt($('#x1').val());
            y = parseInt($('#y1').val());
        }
        else{
            x = parseInt($('#x2').val());
            y = parseInt($('#y2').val());
        }

        return this.newPoint(
            !isNaN(x) ? x : 0,
            !isNaN(y) ? y : 0
        )
    },

    setPoint: function(index, x, y){
        if(index <= 1 ){
            $('#x1').val(x);
            this.onPoinsInputChange($('#x1')[0], x);
            $('#y1').val(y);
            this.onPoinsInputChange($('#y1')[0], y);
        }
        else{
            $('#x2').val(x);
            this.onPoinsInputChange($('#x2')[0], x);
            $('#y2').val(y);
            this.onPoinsInputChange($('#y2')[0], y);
        }
    },

    setResolution: function(resolution){

        if(isNaN(resolution) || resolution > 10)
            resolution = 10;
        else if(resolution < 3)
            resolution = 3;

        this.$resolutionSelect.val(resolution);
        this.onSelectResolutionChange(resolution);
    },

    setAlgorithm: function(algorithm){
        this.$algorithmSelect.val(algorithm);
        this.onAlgorithmSelect(algorithm);
    },

    onPoinsInputChange: function(element, value){

        if(value < 0 || isNaN(value))
            $(element).val(0).select();

        else if(value > element.max)
            $(element).val(element.max);

        this._appRoot_.Base.fireEvent('points-change', this.$domObj, [
            this.getPoint(1),
            this.getPoint(2)
        ]);
    },

    onSelectResolutionChange: function(value){

        if(isNaN(value) || value > 10){
            value = 10;
            this.$resolutionSelect.val(10);
        }
        else if(value < 3){
            value = 3;
            this.$resolutionSelect.val(3);
        }

        this._appRoot_.Base.fireEvent('resolution-change', this.$domObj, [value]);
    },

    onColorSelect: function(value){
        this._appRoot_.Base.fireEvent('color-change', this.$domObj, [this.colorHexToDec(value)]);
    },

    onAlgorithmSelect: function(value){
        this._appRoot_.Base.fireEvent('algorithm-change', this.$domObj, [value]);
    },

    ready: function(){
        var me = this;

        // me.grid.$domObj.on('grid-raster', function(e, scale, pixelsWidth, pixelsHeight, width, height){
        //     me.$points.each(function(index, input){
        //         if(input.id.indexOf('x') >= 0) input.max = width;
        //         if(input.id.indexOf('y') >= 0) input.max = height;
        //     });
        // });
        me.$points.bind('input', function(){me.onPoinsInputChange(this, parseInt($(this).val()))});
        me.$resolutionSelect.change(function(){me.onSelectResolutionChange(parseInt(this.value))});
        me.$algorithmSelect.change(function(){me.onAlgorithmSelect(this.value)});

        me.$palette.click(function(){
            me.$palette.removeClass('selected');
            $(this).addClass('selected');
            me.onColorSelect($(this).data('color'));
        });
    },

    init: function(){
        this.$domObj = $(this.$domObj);
        this.canvas = this._appRoot_.get(this.canvas);
        this.grid = this._appRoot_.get(this.grid);
        this.util = this._appRoot_.get('Util');
        this.$points = $(this.$points);
        this.$resolutionSelect = $(this.$resolutionSelect);
        this.$palette = $(this.$palette);
        this.$algorithmSelect = $(this.$algorithmSelect);
    }
});
