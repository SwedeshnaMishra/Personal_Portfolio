$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
    });
    
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
});

const tabs = document.querySelectorAll('[data-target]'),
        tabContent = document.querySelectorAll('[data-content]')

        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const target = document.querySelector(tab.dataset.target);

                tabContent.forEach(tabContents => {
                    tabContents.classList.remove('skills_active');
                });

                target.classList.add('skills_active');

                tabs.forEach(tab => {
                tab.classList.remove('skills_active');
                    
                });
                tab.classList.add('skills_active');

            });
        });

        const form = document.getElementById('form');
        const result = document.getElementById('result');
        
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          const formData = new FormData(form);
          const object = Object.fromEntries(formData);
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait..."
        
            fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        result.innerHTML = json.message;
                    } else {
                        console.log(response);
                        result.innerHTML = json.message;
                    }
                })
                .catch(error => {
                    console.log(error);
                    result.innerHTML = "Something went wrong!";
                })
                .then(function() {
                    form.reset();
                    setTimeout(() => {
                        result.style.display = "none";
                    }, 3000);
                });
        });