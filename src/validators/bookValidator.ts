import Joi from "joi";
import type { NewBook } from "../types/book.types";

export const bookSchema = Joi.object<NewBook>({
  title: Joi.string().min(2).max(150).required().messages({
    'string.empty': 'Please provide the book title',
    'string.min': 'Min 2 characters.',
    'string.max': 'Max 150 characters.',
  }),
  author: Joi.string().min(2).max(100).required().messages({
    'string.empty': "Please provide the author.",
    'string.min': 'Author name needs at least 2 letters.',
  }),
  genre: Joi.string().min(3).max(60).required().messages({
    'string.empty': 'What genre is this book?',
  }),
  rating: Joi.number().min(0).max(5).integer().required().messages({
    'number.base': 'Rating should be a number.',
    'number.min': 'Rating is between 0 and 5.',
    'number.max': 'Rating is between 0 and 5.',
    'number.integer': 'Rating must be a whole number',
  }),
  status: Joi.string().valid("Read", "Currently Reading", "To Read", "Dropped").required().messages({
    'any.only': 'Please select a valid status.',
    'string.empty': 'Status is needed.',
  }),
  pages: Joi.number().min(1).integer().positive().required().messages({
    'number.base': 'Please enter the number of pages',
    'number.min': 'Min 1 page',
    'number.integer': 'Pages should be a whole number',
    'number.positive': 'Pages must be a positive number'
  }),
  review: Joi.string().max(1000).allow('').optional().messages({
    'string.max': 'Max 1000 characters',
  }),
});
