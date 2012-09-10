Ext.define('PortfolioExampleApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        
        this.drawTypeComboBox();
    },
    
    drawTypeComboBox: function(){
    
        this.typeComboBox = this.add({
            xtype: 'rallyportfolioitemtypecombobox'
        });
        
        this.typeComboBox.on('select', this.drawGrid, this);
        this.typeComboBox.getStore().on('load', this.drawGrid, this);
    
    },
    
    drawGrid: function(){

        var selectedType = this.typeComboBox.getRecord();
    
        Rally.data.ModelFactory.getModel({
            type: selectedType.get('TypePath'),
            success: function(model){
            
                if(this.grid){
                    this.grid.reconfigureWithModel(model);
                } else {
                    this.grid = this.add({
                        xtype: 'rallygrid',
                        columnCfgs: [
                            'FormattedID',
                            'Name',
                            'State'
                        ],
                        model: model
                    });
                
                }
                
            },
            scope: this
        });
    
    }
});
