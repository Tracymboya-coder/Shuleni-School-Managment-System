from flask_jwt_extended import get_jwt, get_jwt_identity


def current_user():
    """Returns {id, schoolId, role, name} from the verified JWT.
    Call only inside a route already guarded by @jwt_required() or @require_role(...).
    """
    claims = get_jwt()
    return {
        "id": get_jwt_identity(),
        "schoolId": claims.get("schoolId"),
        "role": claims.get("role"),
        "name": claims.get("name"),
    }
