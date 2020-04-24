
(async () => {
    const trigger = document.querySelector('.trigger');
    /**
     * update state of trigger button
     */
    const updateDisplayState = (el, bool) => {
        if(!bool){
            el.classList.add('disabled');
        } else {
            el.classList.remove('disabled');
        }
        el.textContent = !bool ? 'turn ON' : 'turn OFF';
    };

    /**
     * Make sure default state of app is set (whether it is activated or not)
     */
    const activeState = await browser.storage.local.get('isActive').then(results => results.isActive);
    if (!activeState) {
        await browser.storage.local.set({
            isActive: false
        });
    }

    /**
     * update the visuals of trigger button
     */
    updateDisplayState(trigger, await browser.storage.local.get('isActive').then(results => results.isActive));
    
    // on / off functionality
    document.querySelector('.trigger').addEventListener("click",  async(e) => {
        // get current state
        const result = await browser.storage.local.get('isActive').then(results => results.isActive);
        // now set the opposite of current state
        await browser.storage.local.set({
            isActive: !result
        }).then(() => {
            // update html
            const target = e.target;
            updateDisplayState(target, !result);
            // reload tab
            browser.tabs.reload();
            // close browser extension window
            window.close();
        });
    });


})();