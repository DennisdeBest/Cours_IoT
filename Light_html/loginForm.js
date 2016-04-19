$(function(){
    console.log("jQuery");

    var name = '';
    var pass = '';

    $('#name').bind('input propertychange change', function() {
        name = $(this).val();
    });
    $('#pass').bind('input propertychange change', function() {
        pass = $(this).val();
    });

    if(name =='' || pass==''){
        $('#submitButton').prop(disabled, 'true')
    }
    else
        $('#submitButton').prop(disabled, 'false')

});