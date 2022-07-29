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
