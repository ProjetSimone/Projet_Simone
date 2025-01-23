document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.querySelector('.theme-switch');
    const html = document.documentElement;
    const overlay = document.getElementById('overlay');
    const infoButton = document.querySelector('.info-button');
    const infoPopup = document.getElementById('info-popup');

    // Gestion du changement de thème
    themeSwitch?.addEventListener('click', () => {
        html.classList.toggle('dark');
        themeSwitch.classList.toggle('fa-moon');
        themeSwitch.classList.toggle('fa-sun');
    });

    function closePopup() {
        document.getElementById('welcome-popup').classList.add('hidden');
        const phoneContainer = document.getElementById('phone-container');
        phoneContainer.classList.add('visible');
    }

    function showActionPopup(popupId) {
        const popup = document.getElementById(popupId);
        overlay.classList.add('visible');
        popup.classList.add('show');
    }

    function closeActionPopup(popupId) {
        const popup = document.getElementById(popupId);
        overlay.classList.remove('visible');
        popup.classList.remove('show');
    }

    infoButton.addEventListener('click', () => {
        overlay.classList.add('visible');
        infoPopup.classList.remove('hidden');
    });

    function closeInfoPopup() {
        overlay.classList.remove('visible');
        infoPopup.classList.add('hidden');
    }

    overlay.addEventListener('click', () => {
        closeInfoPopup();
        closeActionPopup('share-popup');
        closeActionPopup('comment-popup');
    });

    // Ajout des événements pour les publications
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const likeButton = post.querySelector('.fa-heart');
        const commentButton = post.querySelector('.fa-comment');
        const shareButton = post.querySelector('.fa-paper-plane');
        const likesCountElement = post.querySelector('.post-likes');

        // Extraction du nombre initial de likes
        const originalLikesText = likesCountElement.textContent;
        const originalLikesMatch = originalLikesText.match(/Aimé par .+ et (\d+) personnes/);
        let currentLikes = originalLikesMatch ? parseInt(originalLikesMatch[1]) : 0;

        let isLiked = false;

        likeButton.addEventListener('click', () => {
            likeButton.classList.add('heart-animation');
            isLiked = !isLiked;
            
            if (isLiked) {
                likeButton.classList.remove('far');
                likeButton.classList.add('fas', 'liked');
                currentLikes++;
            } else {
                likeButton.classList.remove('fas', 'liked');
                likeButton.classList.add('far');
                currentLikes--;
            }
            
            // Mise à jour dynamique du texte des likes
            const likesPrefix = originalLikesText.split(' et ')[0];
            likesCountElement.textContent = `${likesPrefix} et ${currentLikes.toLocaleString('fr-FR')} personnes`;
            
            setTimeout(() => {
                likeButton.classList.remove('heart-animation');
            }, 300);
        });

        commentButton.addEventListener('click', () => {
            showActionPopup('comment-popup');
        });

        shareButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText('https://projetsimone.github.io/Projet_Simone/');
                showActionPopup('share-popup');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    });

    // Fonctions globales pour les popups
    window.closePopup = closePopup;
    window.closeInfoPopup = closeInfoPopup;
    window.closeActionPopup = closeActionPopup;
});
