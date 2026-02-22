from supabase import create_client, Client
from functools import lru_cache
from ..config.settings import settings

@lru_cache()
def get_supabase_client() -> Client:
    """Get a singleton Supabase client instance"""
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

# Convenience function for direct access
def get_db() -> Client:
    return get_supabase_client()
