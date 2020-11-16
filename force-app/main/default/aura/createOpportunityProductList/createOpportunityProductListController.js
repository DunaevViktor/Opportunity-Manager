({
    doInit: function(component, event, helper) {
        helper.initColumns(component);
        helper.initProduct(component);
        helper.initListProducts(component);
        helper.initProduct2(component);
    },

    selectProduct: function(component){
        var selectedProducts = component.find("productsTable").getSelectedRows();
        var selectedProduct = selectedProducts[0];
        var priceInput = component.find("price");
        priceInput.set("v.value", selectedProduct.UnitPrice);
    },
    
    handleSaveProduct: function(component, event, helper) {
        helper.addProduct(component);
    },

    handleRowAction: function (component, event, helper) {
        helper.deleteProduct(component, event);
    },
})