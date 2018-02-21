$(".faq-question").click(function(e){
	var answer = $(this).siblings(".faq-answer");
	if (answer.hasClass("hide")) {
		answer.removeClass("hide");
    }
	else {
		answer.addClass("hide");
    }
});
