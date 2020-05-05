/**
 * IDEA Service
 */
const moment = require('moment');

class IdeaService {
  constructor() {
    this.ideas = [];
  }

  // A typical GET handler
  async find() {
    return this.ideas;
  }

  // a typical POST handler
  async create(data) {
    const idea = {
      id: this.ideas.length,
      text: data.text,
      tech: data.tech,
      viewer: data.viewer
    };
    idea.time = moment().format('h:mm:ss a');

    this.ideas.push(idea);
    return idea;
  }
}

module.exports = IdeaService;
