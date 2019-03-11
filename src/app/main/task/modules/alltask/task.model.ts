export class Task
{

    id : any;
    user_id : number;
    available_completer : string;
    category : string;
    description : string;
    reward : number;
    requirement_status : object = {
            is_activity_passed: false,
            is_reputation_passed: false,
            is_high_risk: false,
            is_follower: false,
    };
    slug : any;
    status_str : string;
    task_link : string;
    title : string;
    total_point : number;
    total_rewards : number;
    user : object;

    /**
     * Constructor
     *
     * @param tasks
     */
    constructor(tasks)
    {
        
        {
            this.id = tasks.id || '';
            this.user_id = tasks.user_id || '';
            this.available_completer = tasks.available_completer || '';
            this.category = tasks.category || '';
            this.description = tasks.description || '';
            this.reward = tasks.reward || '';
            this.requirement_status = tasks.requirement_status || '';
            this.slug = tasks.slug || '';
            this.status_str = tasks.status_str || '';
            this.task_link = tasks.task_link || '';
            this.title = tasks.title || '';
            this.total_point = tasks.total_point || '';
            this.total_rewards = tasks.total_rewards || '';
            this.user = tasks.user || '';
        }
    }
}
