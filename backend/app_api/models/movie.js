var mongoose = require('mongoose');

var episode = new mongoose.Schema(
    {
        name: { type: String, required: true},
        duration: { type: String, required: true},
        description: { type: String, required: true},
        posterURL: { type: String, required: true},
        videoURL: { type: String, required: true},
    }
);

var character = new mongoose.Schema(
    {
        name: { type: String, required: true},
        actor: { type: String, required: true},
    }
);

var movie = new mongoose.Schema(
    {
        posterURL: { type: String, required: true},
        videoURL: { type: String, required: true},

        name: { type: String, required: true},
        category: { type: String, required: true},
        productionYear: { type: String, required: true},
        imdbScore: { type: Number, required: true},
        duration: { type: String, required: true},
        screenwriter: { type: String, required: true},
        director: { type: String, required: true},
        producer: { type: String, required: true},
        language: { type: String, required: true},
        ageLimit: { type: String, required: true},

        characters: [character],
        description: { type: String, required: true},

        isSeries: { type: Boolean, required: true},
        episodes: [episode],
    }
);

mongoose.model("movie", movie, "movies");