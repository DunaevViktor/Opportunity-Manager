({
    handleSearch: function( component, searchTerm ) {
        var action = component.get( "c.searchAccounts" );
        action.setParams({
            searchTerm: searchTerm
        });
        action.setCallback( this, function( response ) {
            this.accountsLoaded(component);
            component.set( 'v.rows', response.getReturnValue() );
        });
        $A.enqueueAction( action );
    },

    accountsLoaded: function( component) {
        var cols = [
            {
                'label': 'Name',
                'fieldName': 'Name',
                'type': 'text'
            },
            {
                'label': 'Phone',
                'fieldName': 'Phone',
                'type': 'phone'
            },
            {
                'label': 'Website',
                'fieldName': 'Website',
                'type': 'url'
            }
        ];
        component.set( 'v.cols', cols );
    }
}) 