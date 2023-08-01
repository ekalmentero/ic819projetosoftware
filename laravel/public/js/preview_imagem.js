document.getElementById('imagemInput').addEventListener('change', function(event) {
    var input = event.target;
    
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            var img = new Image();
            
            img.onload = function() {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                
                // Define o tamanho desejado
                var width = 220;
                var height = 220;
                
                // Configura o canvas com as dimensões desejadas
                canvas.width = width;
                canvas.height = height;
                
                // Desenha a imagem esticada no canvas
                ctx.drawImage(img, 0, 0, width, height);
                
                // Obtém a imagem esticada como base64
                var stretchedImage = canvas.toDataURL('image/jpeg');
                
                // Exibe a imagem esticada
                var preview = document.getElementById('imagemPreview');
                preview.innerHTML = '<img src="' + stretchedImage + '" width="' + width + '" height="' + height + '" />';
            }
            
            img.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
});