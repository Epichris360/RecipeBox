// your custom app logic goes here:
(function(){
	var turbo = Turbo({
		site_id: "59dbb5c29caba80012e3c468" 
    })
	$('#btn-upload').click(function(event){
        event.preventDefault()
        console.log('hi there')
		turbo.uploadFile(function(err, data){
			if (err){
				alert('Error:' + err.message)
				return
			}

			console.log('Upload Complete: ' + JSON.stringify(data))
		})
	})

})()