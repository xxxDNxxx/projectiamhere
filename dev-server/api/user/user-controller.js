import User from '../../model/user-model'

export function index(req, res) {
    User.find({}, (error, users) => {
        if (error) {
            return res.status(500).json()
        }
        return res.status(200).json({ users: users })
    })
}

export function remove(req, res) {
    Event.fineOne({ _id: req.params.id }, (error, users) => {
        if (error) {
            return res.status(500).json()
        }
        if (!event) {
            return res.status(404).json()
        }
        Event.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(204).json()
        })
    })
}