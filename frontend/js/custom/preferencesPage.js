$('.pref-load').on('load', function() {

            var hardcode = '{' + 

            "error_code": 200,

            "user":
            {
                "summoner_name": "ImDaBest",
                "current_rank": 4
            },

            "student":
            {
                "last_hitting": true,
                "macro": false,
                "map_awareness": false,
                "skillshots": true,
                "freezing_waves": false,
                "matchups": false,
                "setup": true,
                "min_coach_rank": 5
            },

            "coach":
            {
                "last_hitting": true,
                "macro": false,
                "map_awareness": false,
                "skillshots": true,
                "freezing_waves": true,
                "matchups": true,
                "setup": false,
                "max_student_rank": 3
            }
    + '}';

});