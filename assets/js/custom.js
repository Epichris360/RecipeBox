var site = {
	name: '',
	url: '' // can be null
}

var updateSite = function(event){
	site[event.target.name] = event.target.value
}

var submitSite = function(event){
	event.preventDefault()
	if (site.name.length == 0){
		alert('Please Enter a Name')
		return
	}

	var user = window.__USER__
	if (user == null){
		alert('Please login to create an app.')
		return
	}

	site['profile'] = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		image: user.image,
		slug: user.slug
	}


	console.log('submitSite: '+JSON.stringify(site))
    $.ajax({
        url: '/api/site',
        type: 'POST',
        data: JSON.stringify(site),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        success: function(response) {
            // console.log('AJAX CALLBACK: '+JSON.stringify(response))
            window.location.href = '/site/'+response.result.slug
        }
    })	

}