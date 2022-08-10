//Exemplo axios
/*function getStudentById(id){
    alert('s');
    axios.get('http://localhost:3000/student/1/cr')
            .then(response => {
                console.log(response.data);
            });
}
*/

$("#btnCalculateCR").click(function(){
    var studentId = $('#iptStudentId').val();
    $.get( 'http://localhost:3000/student/'+studentId+'/cr')
        .done(function( data ) {
            $('#iptCR').val(data);

    });
});

$("#btnAddUser").click(function(){
    var userName = $('#iptName').val();
    var userEmail = $('#iptEmail').val();
    var userPassword = $('#iptPassword').val();
    
    $.post( 'http://localhost:3000/user/', { name: userName, email: userEmail, password: userPassword })
        .done(function( data ) {
            $('#divAddUserSuccess').html('Usuário cadastrado com sucesso');
            $('#divAddUserSuccess').show();
    });

});