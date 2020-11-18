({
    doInit: function(component, event, helper) {
        helper.initColumns(component);
        helper.initProduct(component);
        helper.initListProducts(component);
        helper.initProduct2(component);
    },

    selectProduct: function(component){
        component.set("v.showError", false);
        var selectedProducts = component.find("productsTable").getSelectedRows();
        var selectedProduct = selectedProducts[0];
        var priceInput = component.find("price");
        priceInput.set("v.value", selectedProduct.UnitPrice);
    },
    
    handleSaveProduct: function(component, event, helper) {
        var selectedProducts = component.find("productsTable").getSelectedRows();
        if (selectedProducts.length == 0){
            component.set("v.showError", true);
            component.set("v.message", 'Please, choose a product!');
            return;
        }

        var fieldsToValidate = [];
        fieldsToValidate.push(component.find('quantity'));
        fieldsToValidate.push(component.find('price'));

        const allValid = fieldsToValidate.reduce(function (correctValid, inputCmp) {
            inputCmp.reportValidity();
            return correctValid && inputCmp.checkValidity();
        }, true);

        if(!allValid) {
            return;
        }

        helper.addProduct(component);
    },

    handleRowAction: function (component, event, helper) {
        helper.deleteProduct(component, event);
    },
})