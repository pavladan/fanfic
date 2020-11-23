export function extractUser(req) {
    if (!req.user) return null;
    const {
      _id, name, email, bio, profilePicture, emailVerified, isAdmin
    } = req.user;
    return {
      _id, name, email, bio, profilePicture, emailVerified, isAdmin
    };
  }
  