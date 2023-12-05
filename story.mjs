class Story {
    /**
     * @param {Object} task, with appropriate fields of a task
     **/
    constructor(story) {
      this.name = story.name,
      this.scene1 = story.scene1;
      this.scene2 = story.scene2;
    }
}

export{
    Story,
}
  