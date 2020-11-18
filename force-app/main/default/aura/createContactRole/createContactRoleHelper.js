({
    initColumns: function(component) {
        component.set('v.columns', [
            {label: 'Contact', fieldName: 'ContactId', type: 'text'},
            {label: 'Role', fieldName: 'Role', type: 'text'},
            {label: 'Primary', fieldName: 'IsPrimary', type: 'checkbox'},
            {label: 'Action', type: 'button', typeAttributes: { label: 'Delete', name: 'delete'}}
        ]);

        var cols = [
            {label: 'Name', fieldName: 'Name', type: 'text'}
        ];
        component.set("v.contactColumns", cols);
    },

    initContacts: function(component) {
        var action = component.get("c.getAllContacts");
        var AccountId = component.get("v.AccountId");

        action.setParams({
            accountId: AccountId
        });

        action.setCallback(this, function(response) {
            component.set("v.contacts", response.getReturnValue());
        });
        
        $A.enqueueAction(action);
    },

    initRole: function(component) {
        let getRoleAction = component.get("c.createRole");
        getRoleAction.setCallback(this, function(response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.Role", response.getReturnValue());
            }
            else{
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(getRoleAction);
    },

    initListRoles: function(component) {
        let getListAction = component.get("c.createListRoles");
        getListAction.setCallback(this, function(response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.Roles", response.getReturnValue());
            }
            else{
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(getListAction);
    },

    addRole: function(component) {
        let role = component.get("v.Role");
        let roles = component.get("v.Roles");
        component.set("v.isEmpty", false);

        role.Role = component.find("role").get("v.value");
        role.IsPrimary = component.find("primary").get("v.checked");
        var selectedContacts = component.find("contactsTable").getSelectedRows();
        role.ContactId = selectedContacts[0].Id;

        roles.push(role);
        component.set("v.Roles", roles);
        
        this.setEmptyRole(component);
    },

    setEmptyRole: function(component){
        let getRoleAction = component.get("c.createRole");
        getRoleAction.setCallback(this, function(response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.Role", response.getReturnValue());
            }
            else{
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(getRoleAction);
    },

    deleteRole: function(component, event) {
        var action = event.getParam('action');
        var row = event.getParam('row');

        switch(action.name){
            case 'delete': {
                var rows = component.get('v.Roles');
                var rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                component.set('v.Roles', rows);

                if(rows.length == 0) {
                    component.set("v.isEmpty", true);  
                }
            }
            break;
        }
    },

    initPickList: function(component){
        var action = component.get("c.getPickList");

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.picklistValues", response.getReturnValue());                
            }
            else {
                console.log("Failed with state: " + state);
            }
        });

        $A.enqueueAction(action);
    },

})