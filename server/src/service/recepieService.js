import Recepie from "../models/Recepie.js";

export default {
    getAll(filter = {}) {
        return Recepie.find(filter);
    },
    getOne(recepieId) {
        return Recepie.findById(recepieId);
    },
    create(recepieData, userId) {
        return Recepie.create({ ...recepieData, _ownerId: userId });
    },
    update(recepieId, recepieData) {
        return Recepie.findByIdAndUpdate(recepieId, recepieData);
    },
    delete(recepieId) {
        return Recepie.findByIdAndDelete(recepieId);
    }
}
