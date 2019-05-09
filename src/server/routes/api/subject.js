const express = require("express");
const Subject = require("../../models/Subject");
const authorization = require("../../middleware/authorization");
const router = express.Router();
const validateSubjectInput = require("../../validation/subject");

// @GET ROUTES //

// @Route api/subject/:subjectName
// Get all the subjects by name
router.get("/:subjectName", authorization, async (req, res) => {
  const { subjectName } = req.params;

  try {
    let subjects = await Subject.find({ subjectName })
      .sort({ dateCreated: -1 })
      .populate("user", ["schoolId", "firstName", "lastName"]);

    if (!subjects) {
      res.status(404).json({ message: "No subject found!" });
    }

    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Server Error! Please Try Again" });
  }
});

// @Route api/subject/profile
// Get all enrolled subject
router.get("/profile", authorization, async (req, res) => {
  const { id } = req.user;

  try {
    let subject = await Subject.find({ user: id }).populate("user", [
      "studentId",
      "firstName",
      "lastName"
    ]);

    if (!subject) {
      return res.status(400).json({
        message: "There are no currently enrolled subject to this user"
      });
    }
    res.json(subject);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error! Please Try Again" });
  }
});

// @POST ROUTES //

// @Route api/subject/enroll/:id
//Enroll a user based on the params id

router.post("/enroll/:id", authorization, async (req, res) => {
  const { errors, isValid } = validateSubjectInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let {
    subjectName,
    prelimQuiz1,
    prelimQuiz2,
    prelimQuiz3,
    prelimRecitation1,
    prelimRecitation2,
    prelimRecitation3,
    prelimAssignment1,
    prelimAssignment2,
    prelimProject,
    prelimExam,
    midtermQuiz1,
    midtermQuiz2,
    midtermQuiz3,
    midtermRecitation1,
    midtermRecitation2,
    midtermRecitation3,
    midtermAssignment1,
    midtermAssignment2,
    midtermProject,
    midtermExam,
    finalsQuiz1,
    finalsQuiz2,
    finalsQuiz3,
    finalsRecitation1,
    finalsRecitation2,
    finalsRecitation3,
    finalsAssignment1,
    finalsAssignment2,
    finalsProject,
    finalsExam
  } = req.body;

  let { id } = req.params;

  let subjectFields = {};
  subjectFields.user = id;

  if (subjectName) subjectFields.subjectName = subjectName;
  if (prelimQuiz1) subjectFields.prelimQuiz1 = prelimQuiz1;
  if (prelimQuiz2) subjectFields.prelimQuiz2 = prelimQuiz2;
  if (prelimQuiz3) subjectFields.prelimQuiz3 = prelimQuiz3;
  if (prelimRecitation1) subjectFields.prelimRecitation1 = prelimRecitation1;
  if (prelimRecitation2) subjectFields.prelimRecitation2 = prelimRecitation2;
  if (prelimRecitation3) subjectFields.prelimRecitation3 = prelimRecitation3;
  if (prelimAssignment1) subjectFields.prelimAssignment1 = prelimAssignment1;
  if (prelimAssignment2) subjectFields.prelimAssignment2 = prelimAssignment2;
  if (prelimProject) subjectFields.prelimProject = prelimProject;
  if (prelimExam) subjectFields.prelimExam = prelimExam;
  //Midterms
  if (midtermQuiz1) subjectFields.midtermQuiz1 = midtermQuiz1;
  if (midtermQuiz2) subjectFields.midtermQuiz2 = midtermQuiz2;
  if (midtermQuiz3) subjectFields.midtermQuiz3 = midtermQuiz3;
  if (midtermRecitation1) subjectFields.midtermRecitation1 = midtermRecitation1;
  if (midtermRecitation2) subjectFields.midtermRecitation2 = midtermRecitation2;
  if (midtermRecitation3) subjectFields.midtermRecitation3 = midtermRecitation3;
  if (midtermAssignment1) subjectFields.midtermAssignment1 = midtermAssignment1;
  if (midtermAssignment2) subjectFields.midtermAssignment2 = midtermAssignment2;
  if (midtermProject) subjectFields.midtermProject = midtermProject;
  if (midtermExam) subjectFields.midtermExam = midtermExam;
  //Finals
  if (finalsQuiz1) subjectFields.finalGrades.finalsQuiz1 = finalsQuiz1;
  if (finalsQuiz2) subjectFields.finalGrades.finalsQuiz2 = finalsQuiz2;
  if (finalsQuiz3) subjectFields.finalGrades.finalsQuiz3 = finalsQuiz3;
  if (finalsRecitation1)
    subjectFields.finalGrades.finalsRecitation1 = finalsRecitation1;
  if (finalsRecitation2)
    subjectFields.finalGrades.finalsRecitation2 = finalsRecitation2;
  if (finalsRecitation3)
    subjectFields.finalGrades.finalsRecitation3 = finalsRecitation3;
  if (finalsAssignment1)
    subjectFields.finalGrades.finalsAssignment1 = finalsAssignment1;
  if (finalsAssignment2)
    subjectFields.finalGrades.finalsAssignment2 = finalsAssignment2;
  if (finalsProject) subjectFields.finalGrades.finalsProject = finalsProject;
  if (finalsExam) subjectFields.finalGrades.finalsExam = finalsExam;
  //Find a student and save

  try {
    let isEnrolled = await Subject.findOne({ subjectName });

    if (isEnrolled) {
      return res
        .status(400)
        .json({ message: "Student is already enrolled to this subject" });
    }

    let subject = await new Subject(subjectFields);
    await subject.save();
    return res.json(subject);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @PUT REQUESTS //
// @Route api/subject/grades/:id

router.put("/grades/:id", authorization, async (req, res) => {
  const { errors, isValid } = validateSubjectInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { id } = req.params;
  let {
    subjectName,
    prelimQuiz1,
    prelimQuiz2,
    prelimQuiz3,
    prelimRecitation1,
    prelimRecitation2,
    prelimRecitation3,
    prelimAssignment1,
    prelimAssignment2,
    prelimProject,
    prelimExam,
    midtermQuiz1,
    midtermQuiz2,
    midtermQuiz3,
    midtermRecitation1,
    midtermRecitation2,
    midtermRecitation3,
    midtermAssignment1,
    midtermAssignment2,
    midtermProject,
    midtermExam,
    finalsQuiz1,
    finalsQuiz2,
    finalsQuiz3,
    finalsRecitation1,
    finalsRecitation2,
    finalsRecitation3,
    finalsAssignment1,
    finalsAssignment2,
    finalsProject,
    finalsExam
  } = req.body;

  let subjectFields = {};

  if (subjectName) subjectFields.subjectName = subjectName;
  if (prelimQuiz1) subjectFields.prelimQuiz1 = prelimQuiz1;
  if (prelimQuiz2) subjectFields.prelimQuiz2 = prelimQuiz2;
  if (prelimQuiz3) subjectFields.prelimQuiz3 = prelimQuiz3;
  if (prelimRecitation1) subjectFields.prelimRecitation1 = prelimRecitation1;
  if (prelimRecitation2) subjectFields.prelimRecitation2 = prelimRecitation2;
  if (prelimRecitation3) subjectFields.prelimRecitation3 = prelimRecitation3;
  if (prelimAssignment1) subjectFields.prelimAssignment1 = prelimAssignment1;
  if (prelimAssignment2) subjectFields.prelimAssignment2 = prelimAssignment2;
  if (prelimProject) subjectFields.prelimProject = prelimProject;
  if (prelimExam) subjectFields.prelimExam = prelimExam;
  //Midterms
  if (midtermQuiz1) subjectFields.midtermQuiz1 = midtermQuiz1;
  if (midtermQuiz2) subjectFields.midtermQuiz2 = midtermQuiz2;
  if (midtermQuiz3) subjectFields.midtermQuiz3 = midtermQuiz3;
  if (midtermRecitation1) subjectFields.midtermRecitation1 = midtermRecitation1;
  if (midtermRecitation2) subjectFields.midtermRecitation2 = midtermRecitation2;
  if (midtermRecitation3) subjectFields.midtermRecitation3 = midtermRecitation3;
  if (midtermAssignment1) subjectFields.midtermAssignment1 = midtermAssignment1;
  if (midtermAssignment2) subjectFields.midtermAssignment2 = midtermAssignment2;
  if (midtermProject) subjectFields.midtermProject = midtermProject;
  if (midtermExam) subjectFields.midtermExam = midtermExam;
  //Finals
  if (finalsQuiz1) subjectFields.finalGrades.finalsQuiz1 = finalsQuiz1;
  if (finalsQuiz2) subjectFields.finalGrades.finalsQuiz2 = finalsQuiz2;
  if (finalsQuiz3) subjectFields.finalGrades.finalsQuiz3 = finalsQuiz3;
  if (finalsRecitation1)
    subjectFields.finalGrades.finalsRecitation1 = finalsRecitation1;
  if (finalsRecitation2)
    subjectFields.finalGrades.finalsRecitation2 = finalsRecitation2;
  if (finalsRecitation3)
    subjectFields.finalGrades.finalsRecitation3 = finalsRecitation3;
  if (finalsAssignment1)
    subjectFields.finalGrades.finalsAssignment1 = finalsAssignment1;
  if (finalsAssignment2)
    subjectFields.finalGrades.finalsAssignment2 = finalsAssignment2;
  if (finalsProject) subjectFields.finalGrades.finalsProject = finalsProject;
  if (finalsExam) subjectFields.finalGrades.finalsExam = finalsExam;

  try {
    await Subject.findById(id).updateOne(subjectFields);
    return res.json({ message: "Updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again" });
  }
});

// @DELETE ROUTES //
// @Route api/subject/detele/:subjectId
// Unenroll student to the subject

router.delete("/delete/:subjectId", authorization, async (req, res) => {
  const { subjectId } = req.params;
  try {
    let subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "No subject found" });
    }
    await subject.remove();
    res.json({ message: "Deleted Successfuly" });
  } catch (error) {
    res.status(500).json({ message: "Server Error please try again." });
  }
});

module.exports = router;
