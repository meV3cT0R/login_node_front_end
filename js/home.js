$(function() {

    
    navbar();

    checkSecure((data)=>{
        console.log(data);
            $("#welcome_user").text(`Welcome, ${data.data.first_name} ${data.data.last_name}`)
            const vals = ["username","phone","first_name","last_name","gender"]

            for(const val of vals) {
                $(`#${val}`).text(`${data.data[val]}`)

            }
    });
})