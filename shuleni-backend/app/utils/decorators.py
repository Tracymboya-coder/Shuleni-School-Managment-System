from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt, verify_jwt_in_request


def require_role(*roles):
    """Restricts a route to one or more roles, e.g. @require_role('ADMIN').
    Must be used together with @jwt_required() (or after it in the decorator stack).
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims.get("role") not in roles:
                return jsonify({"error": "Forbidden for your role"}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator
