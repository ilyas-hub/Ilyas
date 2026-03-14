import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Contact from '../models/Contact';
import { sendEmail } from '../utils/email';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
      return;
    }

    // Save to database if MongoDB is connected
    let contact = null;
    if (mongoose.connection.readyState === 1) {
      try {
        contact = await Contact.create({
          name,
          email,
          subject,
          message,
        });
      } catch (dbError) {
        console.error('Failed to save contact to database:', dbError);
      }
    }

    // Send email notification
    await sendEmail({
      to: process.env.EMAIL_TO || 'shaikhilyas387@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #D32F2F, #FFC107); padding: 20px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0;">New Portfolio Message</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: contact,
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Get all contacts (admin)
// @route   GET /api/contact
// @access  Private
export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Mark contact as read
// @route   PUT /api/contact/:id/read
// @access  Private
export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!contact) {
      res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Error marking contact as read:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
