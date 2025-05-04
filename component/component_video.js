const fs = require('fs');
const path = require('path');
const videosFilePath = path.join(__dirname, '../data/videos.json');


exports.getNewVideo = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login?message=error_login ')
    }
    res.render('video/new_video', { error: null });
};

function saveVideoHELPER(videos) {
    fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2))
}

exports.getDashboard = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login?message=error_login ')
    }

    const { videofilter } = req.params;
    const videos = videoParserJSON();

    let filteredVideos = videos
    if (videofilter === 'mine') {
        filteredVideos = videos.filter(video => video.userEmail === req.session.user.email);
    }

    res.render('video/dashboard', {
        videos: filteredVideos,
        user: req.session.user,
        activeFilter: videofilter
    });
};

exports.postNewVideo = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login?message=error_login')
    }

    const { title, videoId, author } = req.body;
    if (!title || !videoId || !author) {
        return res.render('video/new_video', { error: 'enter all fields' });
    }

    const videos = videoParserJSON()
    videos.push({
        title,
        author,
        videoId,
        userEmail: req.session.user.email
    });
    saveVideoHELPER(videos);

    res.redirect('/video/dashboard/mine')
};

function videoParserJSON() {
    if (!fs.existsSync(videosFilePath)) {
        fs.writeFileSync(videosFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(videosFilePath);
    return JSON.parse(data)
}
