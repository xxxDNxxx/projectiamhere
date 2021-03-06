import User from '../../model/user-model'
import Admin from '../../model/admin-model'
import Event from '../../model/event-model'
import moment from 'moment'
import Waiter from '../../model/waiter-model'
import * as auth from '../../services/auth-service'
import keyrandom from 'randomstring'

export function index(req, res) {
    // find all events
    Event.find({}, (error, events) => {
        if (error) {
            return res.status(500).json()
        }
        return res.status(200).json({ events: events })
    }).populate('author', 'username', 'admins')

}

export function create(req, res) {
    // create event
    const id = auth.getUserId(req)
    Admin.findOne({ _id: id }, (error, user) => {
        if (error && !user) {
            return res.status(500).json()
        }
        const event = new Event(req.body.event)
        event.author = user._id
        event.dueDate = moment(event.dueDate)
        event.eventKey = keyrandom.generate(5)

        event.save(error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(201).json()
        })
    })
}

export function update(req, res) {
    // update a event
    const id = auth.getUserId(req)

    Admin.findOne({ _id: id }, (error, user) => {
        if (error) {
            return res.status(500).json()
        }
        if (!user) {
            return res.status(404).json()
        }

        const event = new Event(req.body.event)
        event.author = user._id
        event.dueDate = moment(event.dueDate)
        Event.findByIdAndUpdate({ _id: event._id }, event, error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(204).json()
        })
    })
}

export function remove(req, res) {
    // delete a events
    const id = auth.getUserId(req)
    Event.findOne({ _id: req.params.id }, (error, event) => {
        if (error) {
            return res.status(500).json()
        }
        if (!event) {
            return res.status(404).json()
        }
        if (event.author._id.toString() !== id) {
            return res.status(403).json({ message: 'Not allowed to delete another user\'s event' })
        }
        Event.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(204).json()
        })
    })
}

export function show(req, res) {
    // get event by id
    Event.findOne({ _id: req.params.id })
        // .populate({ path: 'author', model: 'admins' })
        .populate({
            path: 'attendees',
            model: 'waiters',
            populate: ({ path: 'username', model: 'users' })

        }).exec(function(error, event) {
            if (error) {
                return res.status(500).json()
            }
            if (!event) {
                return res.status(404).json()
            }

            var array = []
            for (var i = 0; i < event.attendees.length; i++) {
                array.push({
                    id: event.attendees[i]._id,
                    userid: event.attendees[i].username._id,
                    username: event.attendees[i].username.username,
                    firstname: event.attendees[i].username.firstname,
                    lastname: event.attendees[i].username.lastname,
                    type: event.attendees[i].type,
                    verify: event.attendees[i].username.verified
                })
            }
            return res.status(200).json({ users: array, event: event })

        })



}

export function updateAttend(req, res) {
    const id = req.body.id
    Waiter.findByIdAndUpdate(id, { type: "attended" }, { new: true }, function(error, waiters) {
        if (error) {
            return res.status(500).json()
        }
        return res.status(204).json({ waiters: waiters })

    })
}

export function updateVerify(req, res) {
    const id = req.body.userid
    User.findByIdAndUpdate(id, { verified: true }, { new: true }).exec(function(error, users) {
        if (error) {
            return res.status(500).json()
        }

        return res.status(204).json({ users: users })
    })
}