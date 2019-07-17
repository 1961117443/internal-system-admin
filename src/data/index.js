export const BillState = {
    browse: 1,
    add: 2,
    edit: 4,

    IsBrowse:function(val){
        return (val & this.browse) === this.browse
    },
    IsInsert:function(val){
        return (val & this.add) === this.add
    },
    IsEdit:function(val){
        return (val & this.edit) === this.edit
    }
}